// GitHub stats placeholder.
//
// Out of scope for the dual-experience redesign. This file documents where
// future implementation should live so the `react-github-calendar` dep that
// is already in package.json has a clear home. When implemented, the hook
// should fetch from api.github.com using the VITE_GITHUB_TOKEN in .env
// (or an Edge function to keep the token server-side), and surface
// `{ data, loading, error }` for both DesktopHome and MobileHome to render.

import { useState } from "react";

export function useGithubStats(/* username */) {
  const [state] = useState({ data: null, loading: false, error: null });
  // TODO: implement
  return state;
}

export default useGithubStats;