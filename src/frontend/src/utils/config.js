// src/config.js
function toBool(v) {
  return v === '1' || v === 'true' || v === true;
}

function join(base = '', path = '') {
  if (!base) return '';
  if (!path) return base;
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

const config = {
  isDemo: toBool(import.meta.env.VITE_DEMO),
  mode: import.meta.env.MODE || 'development',
  ownerToken: import.meta.env.VITE_OWNER_TOKEN,
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
  },
};

export default config;

// export default function initConfig() {
//   return {
//     isDemo: toBool(import.meta.env.VITE_DEMO),
//     mode: import.meta.env.MODE || 'development',
//     ownerToken: import.meta.env.VITE_OWNER_TOKEN,
//     reactUrl: import.meta.env.VITE_REACT_ROUTE,
//     flaskUrl: {
//       base: import.meta.env.VITE_FLASK_ROUTE,
//       health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_FLASK_HEALTH_ROUTE),
//       notion: {
//         health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_NOTION_HEALTH_ROUTE),
//       },
//       db: {
//         health: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_SUPABASE_HEALTH_ROUTE),
//         stats: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_FLASK_STATS_ROUTE),
//       },
//       plan_submissions: join(import.meta.env.VITE_FLASK_ROUTE, import.meta.env.VITE_SUBMISSION_ROUTE),
//     },
//   };
// }