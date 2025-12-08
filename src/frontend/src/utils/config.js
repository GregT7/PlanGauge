// src/config.js
function getPlanStart() {
  return import.meta.env.VITE_DEFAULT_PLAN_START ?? "2025-06-01"
}
function getPlanEnd() {
  return import.meta.env.VITE_DEFAULT_PLAN_END ?? "2025-06-30";
}

function toBool(v) {
  return v === '1' || v === 'true' || v === true;
}

function join(base = '', path = '') {
  if (!base) return '';
  if (!path) return base;
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

const config = {
  filter_start_date: getPlanStart(),
  filter_end_date: getPlanEnd(),
  reactUrl: import.meta.env.VITE_REACT_ROUTE,
  flaskUrl: {
    base: import.meta.env.VITE_FLASK_ROUTE,
    health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_FLASK_HEALTH_ROUTE),
    notion: {
      health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_NOTION_HEALTH_ROUTE),
    },
    db: {
      health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_SUPABASE_HEALTH_ROUTE),
      stats: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_FLASK_STATS_ROUTE),
    },
    plan_submissions: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_SUBMISSION_ROUTE),
    auth: {
      me: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_AUTH_ME_ROUTE),
      login: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_LOGIN_ROUTE),
      logout: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_LOGOUT_ROUTE)
    }
  },
};

export default config;