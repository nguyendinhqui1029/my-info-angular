export const QUERY_KEYS = {
  FOOTER: 'footer-key',
  LANGUAGE: 'language-key',
  SEARCH: 'search-key',
  SKILL_CONTENT: 'skill-content',
  CATEGORIES_BY_ID: 'categories-by-id',
  ABOUT_ME: 'about-me',
  COMPANY_DETAIL: 'company-detail',
  MENU_CLIENT: 'menu-client',
  MENU_ADMIN: 'menu-admin',
  COMPANY_LIST: 'company-list',
}

export const PATH = {
  HOME: 'home',
  SKILL: 'skills',
  SKILL_WITH_ID: 'skill/:id',
  MY_LIFE: 'my-life',
  ABOUT_ME: 'about-me',
  ADMIN: {
    ROOT: 'admin',
    DASHBOARD: 'dashboard',
    PERSONAL_MANAGEMENT: {
      ROOT: 'personal-management',
      COMPANIES_MANAGEMENT: 'companies-management',
      COMPANIES_REGISTER: 'companies-management/:id',
      EDUCATION_MANAGEMENT: 'education-management',
      EDUCATION_REGISTER: 'education-management/:id',
      HOBBY_MANAGEMENT: 'hobby-management',
      HOBBY_REGISTER: 'hobby-management/:id',
      PROJECT_MANAGEMENT: 'projects-management',
      PROJECT_REGISTER: 'projects-management/:id',
      SKILL_MANAGEMENT: 'skills-management',
      SKILL_REGISTER: 'skills-management/:id'

    },
    PAGE_MANAGEMENT: {
      ROOT: 'page-management',
      HEADER_MANAGEMENT: 'header-management',
      HEADER_REGISTER: 'header-management/:id',
      FOOTER_MANAGEMENT: 'footer-management',
      FOOTER_REGISTER: 'footer-management/:id'
    },
    SETTINGS: 'settings',
  },
  NOT_FOUND: 'not-found'
}

export enum LocalStorageKey {
  websiteMode = 'SITE_MODE',
  language = 'LANGUAGE'
}

export enum CardTypeComponent {
  leftContentCard = 'LEFT_CONTENT_CARD',
  circleImageCard = 'CIRCLE_IMAGE_CARD',
  gridImageCard = 'GRID_IMAGE_CARD',
  videoImageCard = 'VIDEO_IMAGE_CARD',
  videoVerticalCard = 'VIDEO_VERTICAL',
  videoHorizontalCard = 'VIDEO_HORIZONTAL',
  imageVerticalCard = 'IMAGE_VERTICAL',
  imageHorizontalCard = 'IMAGE_HORIZONTAL'
}

export const DEFAULT_IMAGE = 'assets/images/default.png'

export const PAGE_TYPE = {
  EDIT: 'edit',
  REGISTER: 'register'
}