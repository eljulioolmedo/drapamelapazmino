#!/usr/bin/env python3
"""
Deploy drapamelapazmino.com to Hostinger:
1. Uploads ./dist/ directly via FTPS/FTP to Hostinger so the site goes live immediately.
2. Creates/updates the GitHub repository (eljulioolmedo/drapamelapazmino) and sets GitHub Actions secrets
   for continuous deployment on every push.
"""
import base64
import ftplib
import os
import subprocess
import sys
from pathlib import Path

import requests

try:
    from nacl import encoding, public
    HAS_NACL = True
except ImportError:
    HAS_NACL = False


def load_env(path: str = ".env") -> dict:
    env = {}
    if not os.path.exists(path):
        return env
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip("'").strip('"')
    return env


def ensure_remote_dir(ftp: ftplib.FTP, remote_dir: str):
    if not remote_dir or remote_dir == "/":
        return
    parts = [p for p in remote_dir.replace("\\", "/").split("/") if p]
    for part in parts:
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            ftp.mkd(part)
            ftp.cwd(part)


def upload_directory(ftp: ftplib.FTP, local_dir: Path):
    for item in sorted(local_dir.iterdir()):
        if item.is_file():
            print(f"  [↑] Subiendo archivo: {item.name}")
            with open(item, "rb") as fp:
                ftp.storbinary(f"STOR {item.name}", fp)
        elif item.is_dir():
            print(f"  [📁] Entrando a carpeta: {item.name}")
            try:
                ftp.mkd(item.name)
            except ftplib.error_perm:
                pass
            ftp.cwd(item.name)
            upload_directory(ftp, item)
            ftp.cwd("..")


def deploy_direct_ftp(server: str, user: str, password: str, target_dir: str, dist_dir: Path):
    clean_server = server.replace("ftp://", "").replace("ftps://", "").strip("/")
    print(f"[*] Conectando al servidor FTP de Hostinger ({clean_server}) como '{user}'...")
    try:
        ftp = ftplib.FTP_TLS()
        ftp.connect(clean_server, 21, timeout=30)
        ftp.login(user, password)
        ftp.prot_p()
        print("[+] Conectado de forma segura mediante FTPS.")
    except Exception as e:
        print(f"[!] FTPS no disponible ({e}), intentando conexión FTP estándar...")
        ftp = ftplib.FTP()
        ftp.connect(clean_server, 21, timeout=30)
        ftp.login(user, password)
        print("[+] Conectado mediante FTP.")

    # Auto-detect if public_html exists when target_dir is "/"
    if target_dir in ("/", ""):
        try:
            items = ftp.nlst()
            if "public_html" in items:
                print("[*] Carpeta 'public_html' detectada en la raíz FTP. Entrando a 'public_html'...")
                ftp.cwd("public_html")
        except Exception:
            pass
    else:
        ensure_remote_dir(ftp, target_dir)

    # Remove Hostinger default placeholder file (default.php) if present
    try:
        current_files = ftp.nlst()
        if "default.php" in current_files:
            print("[*] Eliminando archivo placeholder 'default.php' de Hostinger...")
            ftp.delete("default.php")
    except Exception:
        pass

    print(f"[*] Subiendo el contenido compilado de dist/ a Hostinger...")
    upload_directory(ftp, dist_dir)
    ftp.quit()
    print("\n✨ ¡Archivos subidos exitosamente a Hostinger (https://drapamelapazmino.com)!")


def encrypt_secret(public_key_b64: str, secret_value: str) -> str:
    public_key = public.PublicKey(public_key_b64.encode("utf-8"), encoding.Base64Encoder)
    sealed_box = public.SealedBox(public_key)
    encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")


def setup_github_ci(env: dict, server: str, user: str, password: str, target_dir: str):
    gh_user = env.get("GITHUB_USERNAME") or os.environ.get("GITHUB_USERNAME") or "eljulioolmedo"
    gh_repo = env.get("GITHUB_REPO_NAME") or os.environ.get("GITHUB_REPO_NAME") or "drapamelapazmino"
    gh_token = env.get("GITHUB_PAT") or os.environ.get("GITHUB_PAT")

    if not gh_token:
        print("[*] GITHUB_PAT no configurado; omitiendo sincronización con GitHub.")
        return

    headers = {
        "Authorization": f"Bearer {gh_token}",
        "Accept": "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    repo_url = f"https://api.github.com/repos/{gh_user}/{gh_repo}"
    res = requests.get(repo_url, headers=headers, timeout=20)
    if res.status_code == 404:
        print(f"[*] Creando repositorio GitHub '{gh_user}/{gh_repo}'...")
        create_res = requests.post(
            "https://api.github.com/user/repos",
            headers=headers,
            json={
                "name": gh_repo,
                "description": "Sitio web oficial Dra. Pamela Pazmiño · Dental Check UIO (drapamelapazmino.com)",
                "private": False,
            },
            timeout=20,
        )
        if create_res.status_code in (200, 201):
            print(f"[+] Repositorio '{gh_user}/{gh_repo}' creado.")

    if HAS_NACL:
        key_url = f"https://api.github.com/repos/{gh_user}/{gh_repo}/actions/secrets/public-key"
        key_res = requests.get(key_url, headers=headers, timeout=20)
        if key_res.status_code == 200:
            key_data = key_res.json()
            pub_key = key_data["key"]
            key_id = key_data["key_id"]
            secrets_to_set = {
                "HOSTINGER_FTP_SERVER": server.replace("ftp://", "").replace("ftps://", "").strip("/"),
                "HOSTINGER_FTP_USERNAME": user,
                "HOSTINGER_FTP_PASSWORD": password,
                "HOSTINGER_TARGET_DIR": target_dir or "/",
            }
            for s_name, s_val in secrets_to_set.items():
                enc_val = encrypt_secret(pub_key, s_val)
                requests.put(
                    f"https://api.github.com/repos/{gh_user}/{gh_repo}/actions/secrets/{s_name}",
                    headers=headers,
                    json={"encrypted_value": enc_val, "key_id": key_id},
                    timeout=20,
                )
            print("[+] Secretos de GitHub Actions configurados.")

    if not os.path.exists(".git"):
        subprocess.run(["git", "init"], check=True)
        subprocess.run(["git", "config", "user.name", gh_user], check=True)
        subprocess.run(["git", "config", "user.email", f"{gh_user}@users.noreply.github.com"], check=True)

    subprocess.run(["git", "branch", "-M", "main"], check=True)
    remote_target = f"https://{gh_user}:{gh_token}@github.com/{gh_user}/{gh_repo}.git"
    remotes = subprocess.run(["git", "remote"], capture_output=True, text=True).stdout.split()
    if "origin" in remotes:
        subprocess.run(["git", "remote", "set-url", "origin", remote_target], check=True)
    else:
        subprocess.run(["git", "remote", "add", "origin", remote_target], check=True)

    subprocess.run(["git", "add", "."], check=True)
    diff_status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout
    if diff_status.strip():
        subprocess.run(["git", "commit", "-m", "feat: deploy drapamelapazmino.com to Hostinger"], check=True)

    subprocess.run(["git", "push", "-u", "origin", "main", "--force"], check=True)
    print(f"[+] Código respaldado y sincronizado en: https://github.com/{gh_user}/{gh_repo}")


def main():
    project_root = Path(__file__).resolve().parent.parent
    os.chdir(project_root)
    env = load_env(str(project_root / ".env"))

    server = env.get("HOSTINGER_FTP_SERVER") or os.environ.get("HOSTINGER_FTP_SERVER")
    user = env.get("HOSTINGER_FTP_USERNAME") or os.environ.get("HOSTINGER_FTP_USERNAME")
    password = env.get("HOSTINGER_FTP_PASSWORD") or os.environ.get("HOSTINGER_FTP_PASSWORD")
    target_dir = env.get("HOSTINGER_TARGET_DIR") or os.environ.get("HOSTINGER_TARGET_DIR") or "/"

    if not (server and user and password):
        print("Error: Faltan HOSTINGER_FTP_SERVER, HOSTINGER_FTP_USERNAME o HOSTINGER_FTP_PASSWORD en .env")
        sys.exit(1)

    dist_dir = project_root / "dist"
    if not dist_dir.exists():
        print("Error: No existe la carpeta dist/. Ejecuta 'npm run build' primero.")
        sys.exit(1)

    deploy_direct_ftp(server, user, password, target_dir, dist_dir)
    setup_github_ci(env, server, user, password, target_dir)


if __name__ == "__main__":
    main()
