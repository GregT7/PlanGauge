export const MODES = {
  VISITOR: "visitor",
  GUEST: "guest",
  OWNER: "owner",
};

export const MODE_CONFIG = {
  [MODES.VISITOR]: {
    taskSource: "dummy",
    statsSource: "dummy",
    canTestConnections: false,
    canLogin: true,
    canSubmitPlans: false,
    canGenerateInvites: false
  },
  [MODES.GUEST]: {
    taskSource: "empty", // they can play with the table
    statsSource: "real",           // see your real stats
    canTestConnections: false,
    canLogin: false,
    canSubmitPlans: false,
    canGenerateInvites: false
  },
  [MODES.OWNER]: {
    taskSource: "empty",
    statsSource: "real",
    canTestConnections: true,
    canLogin: false,
    canSubmitPlans: true,
    canGenerateInvites: true
  }
};

export function determineCapabilities(mode) {
  return MODE_CONFIG?.[mode] ?? MODE_CONFIG[MODES.VISITOR]
}