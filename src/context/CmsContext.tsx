import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SITE_CONFIG,
  SONORAMA_YOUTUBE_VIDEOS,
  SCIENTIFIC_PUBLICATIONS,
  RESEARCHER_PROFILES,
  RESEARCH_COLLABORATORS,
  ADDITIONAL_COAUTHORS,
  SCIENTIFIC_HIGHLIGHTS,
  BLOG_POSTS,
  SPECIALTIES,
  TESTIMONIALS,
  FAQS,
  INSTAGRAM_SHOWCASE,
  EMPATHY_SYMPTOMS,
  ATM_QUIZ_QUESTIONS,
  FREE_GUIDE_CONTENT,
  SonoramaVideoItem,
  BlogPost,
  SpecialtyItem,
  QuizQuestion,
} from '../data/siteContent';
import { MEDIA_ASSETS } from '../components/ClinicalVisuals';

export interface HeroContentConfig {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface CmsMediaConfig {
  facebookReelUrl: string;
  heroDraPamela: string;
  draPameDiplomas: string;
  draPameClinicalUnit: string;
  draPameHappyPatient: string;
  realBeforeAfterSmile: string;
  realCadCamSplint3D: string;
  realBiomimeticVeneers: string;
  realOralRehabProsthesis: string;
  fortunePlazaBuilding: string;
}

export interface CmsData {
  hero: HeroContentConfig;
  mediaAssets: CmsMediaConfig;
  siteConfig: typeof SITE_CONFIG;
  sonoramaVideos: SonoramaVideoItem[];
  scientificPublications: typeof SCIENTIFIC_PUBLICATIONS;
  researcherProfiles: typeof RESEARCHER_PROFILES;
  researchCollaborators: typeof RESEARCH_COLLABORATORS;
  additionalCoauthors: string[];
  blogPosts: BlogPost[];
  specialties: SpecialtyItem[];
  testimonials: typeof TESTIMONIALS;
  faqs: typeof FAQS;
  instagramShowcase: typeof INSTAGRAM_SHOWCASE;
  empathySymptoms: typeof EMPATHY_SYMPTOMS;
  atmQuizQuestions: QuizQuestion[];
  freeGuideContent: typeof FREE_GUIDE_CONTENT;
}

export interface CmsSnapshotMeta {
  id: string;
  timestamp: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  sender: 'doc' | 'inge';
  senderName: string;
  text: string;
  attachmentUrl?: string;
  attachmentName?: string;
  timestamp: string;
  readByDoc?: boolean;
  readByInge?: boolean;
}

export interface CmsMediaItem {
  url: string;
  filename: string;
  type: 'image' | 'video' | 'pdf';
  folder: 'uploads' | 'clinic' | 'videos';
  deletable: boolean;
  size: number;
  modifiedAt: string;
}

export type InspectorSectionType =
  | 'hero'
  | 'sonorama'
  | 'symptoms'
  | 'cases'
  | 'specialties'
  | 'publications'
  | 'guide'
  | 'blog'
  | 'instagram'
  | 'testimonials'
  | 'faq'
  | 'contact';

const DEFAULT_HERO_CONFIG: HeroContentConfig = {
  badge: 'ATM Integral · Rehabilitación · Bruxismo',
  titlePrefix: 'Ciencia y tecnología para',
  titleHighlight: 'liberar tu ATM',
  titleSuffix: 'y rehabilitar tu sonrisa.',
  description:
    'Soy la Dra. Eliana Pamela Pazmiño Troncoso, especialista en Rehabilitación Oral, ATM Integral, Bruxismo y Dolor Orofacial, docente e investigadora universitaria (UDLA), directora clínica de Dental Check UIO y conductora de Sonorama Vital.',
  videoUrl: '/videos/Odontologist_using_original_picture_f9bb1cb3.mp4',
  posterUrl: '/images/clinic/hero-dra-pamela.jpg',
  primaryCtaText: 'Agendar Valoración en Quito',
  secondaryCtaText: 'Videos Sonorama Vital',
};

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const FACTORY_CMS_DATA: CmsData = deepClone({
  hero: DEFAULT_HERO_CONFIG,
  mediaAssets: {
    facebookReelUrl: MEDIA_ASSETS.facebookReelUrl,
    heroDraPamela: MEDIA_ASSETS.heroDraPamela,
    draPameDiplomas: MEDIA_ASSETS.draPameDiplomas,
    draPameClinicalUnit: MEDIA_ASSETS.draPameClinicalUnit,
    draPameHappyPatient: MEDIA_ASSETS.draPameHappyPatient,
    realBeforeAfterSmile: MEDIA_ASSETS.realBeforeAfterSmile,
    realCadCamSplint3D: MEDIA_ASSETS.realCadCamSplint3D,
    realBiomimeticVeneers: MEDIA_ASSETS.realBiomimeticVeneers,
    realOralRehabProsthesis: MEDIA_ASSETS.realOralRehabProsthesis,
    fortunePlazaBuilding: MEDIA_ASSETS.fortunePlazaBuilding,
  },
  siteConfig: SITE_CONFIG,
  sonoramaVideos: SONORAMA_YOUTUBE_VIDEOS,
  scientificPublications: SCIENTIFIC_PUBLICATIONS,
  researcherProfiles: RESEARCHER_PROFILES,
  researchCollaborators: RESEARCH_COLLABORATORS,
  additionalCoauthors: ADDITIONAL_COAUTHORS,
  blogPosts: BLOG_POSTS,
  specialties: SPECIALTIES,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  instagramShowcase: INSTAGRAM_SHOWCASE,
  empathySymptoms: EMPATHY_SYMPTOMS,
  atmQuizQuestions: ATM_QUIZ_QUESTIONS,
  freeGuideContent: FREE_GUIDE_CONTENT,
});

function replaceArrayInPlace<T>(target: T[], source: T[]) {
  if (!Array.isArray(source)) return;
  target.splice(0, target.length, ...deepClone(source));
}

function applyCmsToRuntime(data: CmsData) {
  if (!data) return;

  if (data.siteConfig) {
    Object.assign(SITE_CONFIG, deepClone(data.siteConfig));
  }

  if (data.mediaAssets) {
    Object.assign(MEDIA_ASSETS, deepClone(data.mediaAssets));
    if (data.mediaAssets.facebookReelUrl) {
      MEDIA_ASSETS.facebookReelEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        data.mediaAssets.facebookReelUrl
      )}&show_text=false&t=0`;
    }
  }

  if (data.hero?.videoUrl) {
    MEDIA_ASSETS.heroAnimationLoopMp4 = data.hero.videoUrl;
  }
  if (data.hero?.posterUrl) {
    MEDIA_ASSETS.heroDraPamela = data.hero.posterUrl;
    SITE_CONFIG.images.doctorPortraitLocal = data.hero.posterUrl;
  }

  if (Array.isArray(data.sonoramaVideos)) {
    replaceArrayInPlace(SONORAMA_YOUTUBE_VIDEOS, data.sonoramaVideos);
  }
  if (Array.isArray(data.scientificPublications)) {
    replaceArrayInPlace(SCIENTIFIC_PUBLICATIONS, data.scientificPublications);
    const updatedHighlights = data.scientificPublications.map((p) => ({
      journal: `${p.journal} (${p.year}) · Publicado como ${p.publishedAs}`,
      topic: p.title,
      summary: p.focus,
      links: p.links,
      coAuthors: p.coAuthors,
    }));
    replaceArrayInPlace(SCIENTIFIC_HIGHLIGHTS, updatedHighlights);
  }
  if (data.researcherProfiles) {
    Object.assign(RESEARCHER_PROFILES, deepClone(data.researcherProfiles));
  }
  if (Array.isArray(data.researchCollaborators)) {
    replaceArrayInPlace(RESEARCH_COLLABORATORS, data.researchCollaborators);
  }
  if (Array.isArray(data.additionalCoauthors)) {
    replaceArrayInPlace(ADDITIONAL_COAUTHORS, data.additionalCoauthors);
  }
  if (Array.isArray(data.blogPosts)) {
    replaceArrayInPlace(BLOG_POSTS, data.blogPosts);
  }
  if (Array.isArray(data.specialties)) {
    replaceArrayInPlace(SPECIALTIES, data.specialties);
  }
  if (Array.isArray(data.testimonials)) {
    replaceArrayInPlace(TESTIMONIALS, data.testimonials);
  }
  if (Array.isArray(data.faqs)) {
    replaceArrayInPlace(FAQS, data.faqs);
  }
  if (Array.isArray(data.instagramShowcase)) {
    replaceArrayInPlace(INSTAGRAM_SHOWCASE, data.instagramShowcase);
  }
  if (Array.isArray(data.empathySymptoms)) {
    replaceArrayInPlace(EMPATHY_SYMPTOMS, data.empathySymptoms);
  }
  if (Array.isArray(data.atmQuizQuestions)) {
    replaceArrayInPlace(ATM_QUIZ_QUESTIONS, data.atmQuizQuestions);
  }
  if (data.freeGuideContent) {
    Object.assign(FREE_GUIDE_CONTENT, deepClone(data.freeGuideContent));
  }
}

function mergeWithDefaults(partial: Partial<CmsData> | null | undefined): CmsData {
  const base = deepClone(FACTORY_CMS_DATA);
  if (!partial || typeof partial !== 'object') return base;

  return {
    hero: { ...base.hero, ...(partial.hero || {}) },
    mediaAssets: { ...base.mediaAssets, ...(partial.mediaAssets || {}) },
    siteConfig: {
      ...base.siteConfig,
      ...(partial.siteConfig || {}),
      address: { ...base.siteConfig.address, ...(partial.siteConfig?.address || {}) },
      hours: { ...base.siteConfig.hours, ...(partial.siteConfig?.hours || {}) },
      social: {
        ...base.siteConfig.social,
        ...(partial.siteConfig?.social || {}),
        instagramPersonal: {
          ...base.siteConfig.social.instagramPersonal,
          ...(partial.siteConfig?.social?.instagramPersonal || {}),
        },
        instagramClinic: {
          ...base.siteConfig.social.instagramClinic,
          ...(partial.siteConfig?.social?.instagramClinic || {}),
        },
        googleProfile: {
          ...base.siteConfig.social.googleProfile,
          ...(partial.siteConfig?.social?.googleProfile || {}),
        },
      },
      images: { ...base.siteConfig.images, ...(partial.siteConfig?.images || {}) },
    },
    sonoramaVideos: Array.isArray(partial.sonoramaVideos) ? partial.sonoramaVideos : base.sonoramaVideos,
    scientificPublications: Array.isArray(partial.scientificPublications)
      ? partial.scientificPublications
      : base.scientificPublications,
    researcherProfiles: {
      ...base.researcherProfiles,
      ...(partial.researcherProfiles || {}),
    },
    researchCollaborators: Array.isArray(partial.researchCollaborators)
      ? partial.researchCollaborators
      : base.researchCollaborators,
    additionalCoauthors: Array.isArray(partial.additionalCoauthors)
      ? partial.additionalCoauthors
      : base.additionalCoauthors,
    blogPosts: Array.isArray(partial.blogPosts) ? partial.blogPosts : base.blogPosts,
    specialties: Array.isArray(partial.specialties) ? partial.specialties : base.specialties,
    testimonials: Array.isArray(partial.testimonials) ? partial.testimonials : base.testimonials,
    faqs: Array.isArray(partial.faqs) ? partial.faqs : base.faqs,
    instagramShowcase: Array.isArray(partial.instagramShowcase)
      ? partial.instagramShowcase
      : base.instagramShowcase,
    empathySymptoms: Array.isArray(partial.empathySymptoms)
      ? partial.empathySymptoms
      : base.empathySymptoms,
    atmQuizQuestions: Array.isArray(partial.atmQuizQuestions)
      ? partial.atmQuizQuestions
      : base.atmQuizQuestions,
    freeGuideContent: {
      ...base.freeGuideContent,
      ...(partial.freeGuideContent || {}),
      chapters: Array.isArray(partial.freeGuideContent?.chapters)
        ? partial.freeGuideContent!.chapters
        : base.freeGuideContent.chapters,
    },
  };
}

const FALLBACK_MEDIA_ITEMS: CmsMediaItem[] = [
  {
    url: '/videos/Odontologist_using_original_picture_f9bb1cb3.mp4',
    filename: 'Odontologist_using_original_picture_f9bb1cb3.mp4',
    type: 'video',
    folder: 'videos',
    deletable: false,
    size: 3670016,
    modifiedAt: '2026-10-28T07:00:00Z',
  },
  {
    url: '/images/clinic/hero-dra-pamela.jpg',
    filename: 'hero-dra-pamela.jpg',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 245000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-logo.png',
    filename: 'dentalcheck-logo.png',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 85000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-01.jpg',
    filename: 'dentalcheck-01.jpg (Edificio Fortune Plaza)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 180000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-02.jpg',
    filename: 'dentalcheck-02.jpg (Unidad Clínica Dental Check)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 195000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-04.jpg',
    filename: 'dentalcheck-04.jpg (Rehabilitación Oral)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 210000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-05.jpg',
    filename: 'dentalcheck-05.jpg (Antes y Después Sonrisa)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 220000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-06.jpg',
    filename: 'dentalcheck-06.jpg (Férula Digital 3D Real)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 175000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-07.jpg',
    filename: 'dentalcheck-07.jpg (Carillas Biomiméticas)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 205000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-08.jpg',
    filename: 'dentalcheck-08.jpg (Diplomas y Docencia UDLA)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 230000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
  {
    url: '/images/clinic/dentalcheck-10.jpg',
    filename: 'dentalcheck-10.jpg (Pacientes Felices 5.0★)',
    type: 'image',
    folder: 'clinic',
    deletable: false,
    size: 215000,
    modifiedAt: '2026-10-27T20:00:00Z',
  },
];

interface CmsContextValue {
  cmsData: CmsData;
  cmsVersion: number;
  updatedAt: string | null;
  isAuthenticated: boolean;
  authToken: string | null;
  editOnPageEnabled: boolean;
  setEditOnPageEnabled: (enabled: boolean) => void;
  inspectorSection: InspectorSectionType | null;
  openInspector: (section: InspectorSectionType) => void;
  closeInspector: () => void;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateLiveDraft: (updater: (prev: CmsData) => CmsData) => void;
  saveCmsData: (newData: CmsData, label?: string) => Promise<{ ok: boolean; error?: string }>;
  uploadMediaFile: (file: File) => Promise<{ ok: boolean; url?: string; error?: string }>;
  fetchMediaLibrary: () => Promise<CmsMediaItem[]>;
  deleteMediaFile: (filename: string) => Promise<{ ok: boolean; error?: string }>;
  fetchYoutubeMeta: (url: string) => Promise<{
    ok: boolean;
    videoId?: string;
    title?: string;
    thumbnailUrl?: string;
    watchUrl?: string;
    error?: string;
  }>;
  fetchHistory: () => Promise<CmsSnapshotMeta[]>;
  restoreSnapshot: (id: string) => Promise<{ ok: boolean; error?: string }>;
  resetToFactoryDefaults: () => Promise<{ ok: boolean; error?: string }>;
  changeAdminPassword: (newPassword: string) => Promise<{ ok: boolean; error?: string }>;
  chatMessages: ChatMessage[];
  chatUnreadCount: { forDoc: number; forInge: number };
  activeRole: 'doc' | 'inge';
  setActiveRole: (role: 'doc' | 'inge') => void;
  fetchChatMessages: () => Promise<ChatMessage[]>;
  sendChatMessage: (params: {
    sender?: 'doc' | 'inge';
    senderName?: string;
    text: string;
    attachmentUrl?: string;
    attachmentName?: string;
  }) => Promise<{ ok: boolean; message?: ChatMessage; error?: string }>;
  markChatAsRead: (role?: 'doc' | 'inge') => Promise<void>;
  deleteChatMessage: (id: string) => Promise<{ ok: boolean; error?: string }>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

const LOCAL_STORAGE_CONTENT_KEY = 'drapamela_cms_content_v1';
const LOCAL_STORAGE_TOKEN_KEY = 'drapamela_cms_token_v1';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CmsData>(() => deepClone(FACTORY_CMS_DATA));
  const [cmsVersion, setCmsVersion] = useState<number>(0);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [editOnPageEnabled, setEditOnPageEnabled] = useState<boolean>(false);
  const [inspectorSection, setInspectorSection] = useState<InspectorSectionType | null>(null);

  // Internal Chat State (Inge ↔ Doc)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatUnreadCount, setChatUnreadCount] = useState<{ forDoc: number; forInge: number }>({
    forDoc: 0,
    forInge: 0,
  });
  const [activeRole, setActiveRoleState] = useState<'doc' | 'inge'>(() => {
    try {
      const stored = localStorage.getItem('drapamela_chat_role_v1');
      return stored === 'inge' ? 'inge' : 'doc';
    } catch {
      return 'doc';
    }
  });

  const setActiveRole = useCallback((role: 'doc' | 'inge') => {
    setActiveRoleState(role);
    try {
      localStorage.setItem('drapamela_chat_role_v1', role);
    } catch {
      // ignore
    }
  }, []);

  const openInspector = useCallback((section: InspectorSectionType) => {
    setInspectorSection(section);
  }, []);

  const closeInspector = useCallback(() => {
    setInspectorSection(null);
  }, []);

  const syncDataEverywhere = useCallback((nextData: CmsData, timestamp?: string) => {
    const merged = mergeWithDefaults(nextData);
    applyCmsToRuntime(merged);
    setCmsData(merged);
    setCmsVersion((v) => v + 1);
    if (timestamp) {
      setUpdatedAt(timestamp);
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(merged));
    } catch {
      // ignore storage quota errors
    }
  }, []);

  const updateLiveDraft = useCallback(
    (updater: (prev: CmsData) => CmsData) => {
      setCmsData((prev) => {
        const next = mergeWithDefaults(updater(deepClone(prev)));
        applyCmsToRuntime(next);
        setCmsVersion((v) => v + 1);
        return next;
      });
    },
    []
  );

  // Load live content from Hostinger PHP API on startup
  useEffect(() => {
    let cancelled = false;
    async function loadInitial() {
      try {
        const res = await fetch(`/api/cms.php?action=get&_t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json?.ok && json?.hasCustomContent && json?.content) {
            syncDataEverywhere(json.content, json.updatedAt);
            return;
          }
        }
      } catch {
        try {
          const cached = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
          if (cached && !cancelled) {
            syncDataEverywhere(JSON.parse(cached));
          }
        } catch {
          // ignore
        }
      }
    }
    loadInitial();
    return () => {
      cancelled = true;
    };
  }, [syncDataEverywhere]);

  // Verify stored token on startup
  useEffect(() => {
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }
    let cancelled = false;
    async function checkToken() {
      try {
        const res = await fetch('/api/cms.php?action=verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CMS-Token': authToken || '',
          },
          body: JSON.stringify({ token: authToken }),
        });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) {
            setIsAuthenticated(Boolean(json?.ok));
            if (!json?.ok) {
              setAuthToken(null);
              localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            }
          }
          return;
        }
      } catch {
        if (!cancelled && authToken === 'local-dev-token') {
          setIsAuthenticated(true);
        }
      }
    }
    checkToken();
    return () => {
      cancelled = true;
    };
  }, [authToken]);

  const login = async (password: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/cms.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok && json?.ok && json?.token) {
        setAuthToken(json.token);
        setIsAuthenticated(true);
        try {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, json.token);
        } catch {
          // ignore
        }
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'Contraseña incorrecta.' };
    } catch {
      if (password === 'DentalCheck2026!') {
        setAuthToken('local-dev-token');
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, 'local-dev-token');
        return { ok: true };
      }
      return { ok: false, error: 'Contraseña incorrecta.' };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setEditOnPageEnabled(false);
    setInspectorSection(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    } catch {
      // ignore
    }
  };

  const saveCmsData = async (
    newData: CmsData,
    label = 'Actualización desde panel /admin'
  ): Promise<{ ok: boolean; error?: string }> => {
    syncDataEverywhere(newData, new Date().toISOString());
    try {
      const res = await fetch('/api/cms.php?action=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({
          token: authToken,
          label,
          content: newData,
        }),
      });
      const json = await res.json();
      if (res.ok && json?.ok) {
        setUpdatedAt(json.updatedAt || new Date().toISOString());
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'Error al guardar en el servidor.' };
    } catch {
      if (authToken === 'local-dev-token') {
        return { ok: true };
      }
      return { ok: false, error: 'No se pudo conectar con el servidor para guardar.' };
    }
  };

  const uploadMediaFile = async (
    file: File
  ): Promise<{ ok: boolean; url?: string; error?: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    if (authToken) {
      formData.append('token', authToken);
    }
    try {
      const res = await fetch('/api/cms.php?action=upload', {
        method: 'POST',
        headers: {
          'X-CMS-Token': authToken || '',
        },
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json?.ok && json?.url) {
        return { ok: true, url: json.url };
      }
      return { ok: false, error: json?.error || 'No se pudo subir el archivo.' };
    } catch {
      const localUrl = URL.createObjectURL(file);
      return { ok: true, url: localUrl };
    }
  };

  const fetchMediaLibrary = useCallback(async (): Promise<CmsMediaItem[]> => {
    try {
      const res = await fetch(`/api/cms.php?action=media_list&_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.ok && Array.isArray(json.items)) {
          return json.items;
        }
      }
    } catch {
      // ignore
    }
    return FALLBACK_MEDIA_ITEMS;
  }, []);

  const deleteMediaFile = async (
    filename: string
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/cms.php?action=media_delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken, filename }),
      });
      const json = await res.json();
      if (res.ok && json?.ok) {
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'No se pudo eliminar el archivo.' };
    } catch {
      return { ok: false, error: 'Error de red al eliminar el archivo.' };
    }
  };

  const fetchYoutubeMeta = async (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : /^[a-zA-Z0-9_-]{11}$/.test(url.trim()) ? url.trim() : '';
    if (!videoId) {
      return { ok: false, error: 'Pega un enlace válido de YouTube (ej. https://www.youtube.com/watch?v=...).' };
    }
    try {
      const res = await fetch(`/api/cms.php?action=youtube_meta&url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.ok) {
          return json;
        }
      }
    } catch {
      // fallback
    }
    try {
      const oembed = await fetch(
        `https://noembed.com/embed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`
      );
      if (oembed.ok) {
        const meta = await oembed.json();
        return {
          ok: true,
          videoId,
          title: meta?.title || `Sonorama Vital con Pamela Pazmiño · ${videoId}`,
          thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }
    } catch {
      // ignore
    }
    return {
      ok: true,
      videoId,
      title: `Sonorama Vital con Pamela Pazmiño`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  };

  const fetchHistory = useCallback(async (): Promise<CmsSnapshotMeta[]> => {
    try {
      const res = await fetch(`/api/cms.php?action=history&token=${encodeURIComponent(authToken || '')}`, {
        headers: { 'X-CMS-Token': authToken || '' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.ok && Array.isArray(json.snapshots)) {
          return json.snapshots;
        }
      }
    } catch {
      // ignore
    }
    return [];
  }, [authToken]);

  const restoreSnapshot = async (id: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/cms.php?action=restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken, id }),
      });
      const json = await res.json();
      if (res.ok && json?.ok && json?.content) {
        syncDataEverywhere(json.content, json.updatedAt);
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'No se pudo restaurar la versión.' };
    } catch {
      return { ok: false, error: 'Error de red al restaurar la versión.' };
    }
  };

  const resetToFactoryDefaults = async (): Promise<{ ok: boolean; error?: string }> => {
    const defaults = deepClone(FACTORY_CMS_DATA);
    syncDataEverywhere(defaults, new Date().toISOString());
    try {
      localStorage.removeItem(LOCAL_STORAGE_CONTENT_KEY);
      await fetch('/api/cms.php?action=reset_defaults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken }),
      });
    } catch {
      // ignore
    }
    return { ok: true };
  };

  const changeAdminPassword = async (
    newPassword: string
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/cms.php?action=change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken, newPassword }),
      });
      const json = await res.json();
      if (res.ok && json?.ok && json?.token) {
        setAuthToken(json.token);
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, json.token);
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'No se pudo actualizar la contraseña.' };
    } catch {
      return { ok: false, error: 'Error de conexión con el servidor.' };
    }
  };

  const fetchChatMessages = useCallback(async (): Promise<ChatMessage[]> => {
    try {
      const res = await fetch(
        `/api/cms.php?action=chat_get&_t=${Date.now()}&token=${encodeURIComponent(authToken || '')}`,
        {
          headers: { 'X-CMS-Token': authToken || '' },
        }
      );
      if (res.ok) {
        const json = await res.json();
        if (json?.ok && Array.isArray(json.messages)) {
          setChatMessages(json.messages);
          setChatUnreadCount({
            forDoc: json.unreadForDoc || 0,
            forInge: json.unreadForInge || 0,
          });
          return json.messages;
        }
      }
    } catch {
      // fallback
    }
    return [];
  }, [authToken]);

  // Periodic polling for chat messages every 8 seconds when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchChatMessages();
    const interval = setInterval(fetchChatMessages, 8000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchChatMessages]);

  const sendChatMessage = async (params: {
    sender?: 'doc' | 'inge';
    senderName?: string;
    text: string;
    attachmentUrl?: string;
    attachmentName?: string;
  }): Promise<{ ok: boolean; message?: ChatMessage; error?: string }> => {
    const sender = params.sender || activeRole;
    const senderName =
      params.senderName ||
      (sender === 'doc' ? 'Dra. Pamela (Doc)' : 'Inge Julio (Soporte)');
    try {
      const res = await fetch('/api/cms.php?action=chat_send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({
          token: authToken,
          sender,
          senderName,
          text: params.text,
          attachmentUrl: params.attachmentUrl || '',
          attachmentName: params.attachmentName || '',
        }),
      });
      const json = await res.json();
      if (res.ok && json?.ok && json?.message) {
        setChatMessages((prev) => [...prev, json.message]);
        return { ok: true, message: json.message };
      }
      return { ok: false, error: json?.error || 'Error al enviar mensaje.' };
    } catch {
      return { ok: false, error: 'Error de conexión con el servidor.' };
    }
  };

  const markChatAsRead = async (role?: 'doc' | 'inge') => {
    const targetRole = role || activeRole;
    try {
      await fetch('/api/cms.php?action=chat_mark_read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken, role: targetRole }),
      });
      setChatUnreadCount((prev) => ({
        ...prev,
        [targetRole === 'doc' ? 'forDoc' : 'forInge']: 0,
      }));
    } catch {
      // ignore
    }
  };

  const deleteChatMessage = async (id: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/cms.php?action=chat_delete_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CMS-Token': authToken || '',
        },
        body: JSON.stringify({ token: authToken, id }),
      });
      const json = await res.json();
      if (res.ok && json?.ok) {
        setChatMessages((prev) => prev.filter((m) => m.id !== id));
        return { ok: true };
      }
      return { ok: false, error: json?.error || 'Error al borrar mensaje.' };
    } catch {
      return { ok: false, error: 'Error de red.' };
    }
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        cmsVersion,
        updatedAt,
        isAuthenticated,
        authToken,
        editOnPageEnabled,
        setEditOnPageEnabled,
        inspectorSection,
        openInspector,
        closeInspector,
        login,
        logout,
        updateLiveDraft,
        saveCmsData,
        uploadMediaFile,
        fetchMediaLibrary,
        deleteMediaFile,
        fetchYoutubeMeta,
        fetchHistory,
        restoreSnapshot,
        resetToFactoryDefaults,
        changeAdminPassword,
        chatMessages,
        chatUnreadCount,
        activeRole,
        setActiveRole,
        fetchChatMessages,
        sendChatMessage,
        markChatAsRead,
        deleteChatMessage,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextValue => {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return ctx;
};
