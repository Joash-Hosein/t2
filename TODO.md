# Auth Fix TODO

## Steps:
1. [x] Create `contexts/AuthContext.tsx` with AuthProvider, useAuth hook, AsyncStorage persistence.
2. [x] Edit `app/_layout.tsx`: Wrap with AuthProvider, add redirect logic based on auth state.
3. [x] Edit `app/(student)/_layout.tsx`: Protect drawer with auth check/redirect if not logged in.
4. [x] Edit `components/sql/Login.jsx`: After login success, setAuthUser and router.push('/(student)/dashboard').
5. [x] Edit `components/sql/Register.jsx`: After register, optionally auto-login or redirect to login.
6. [x] Edit `app/index.tsx`: Show login CTA if not auth'd.
7. [x] Install AsyncStorage and implemented full auth flow: protected student routes, login/register with persistence/redirects.

## Test:
- Run `npx expo start` and test:
  - App redirects unauth to login.
  - Register/login works, redirects to dashboard.
  - Cannot access student tabs without login.
  - Logout (add button in dashboard if needed).
  - Persists on reload.

Auth fix complete!
5. [ ] Edit `components/sql/Register.jsx`: After register, optionally auto-login or redirect to login.
6. [ ] Edit `app/index.tsx`: Show login CTA if not auth'd.
7. [ ] Install AsyncStorage if needed and test full flow.
4. [ ] Edit `components/sql/Login.jsx`: After login success, setAuthUser and router.push('/(student)/dashboard').
5. [ ] Edit `components/sql/Register.jsx`: After register, optionally auto-login or redirect to login.
6. [ ] Edit `app/index.tsx`: Show login CTA if not auth'd.
7. [ ] Install AsyncStorage if needed and test full flow.
3. [ ] Edit `app/(student)/_layout.tsx`: Protect drawer with auth check/redirect if not logged in.
4. [ ] Edit `components/sql/Login.jsx`: After login success, setAuthUser and router.push('/(student)/dashboard').
5. [ ] Edit `components/sql/Register.jsx`: After register, optionally auto-login or redirect to login.
6. [ ] Edit `app/index.tsx`: Show login CTA if not auth'd.
7. [ ] Install AsyncStorage if needed and test full flow.

Progress will be updated as completed.
2. [ ] Edit `app/_layout.tsx`: Wrap with AuthProvider, add redirect logic based on auth state.
3. [ ] Edit `app/(student)/_layout.tsx`: Protect drawer with auth check/redirect if not logged in.
4. [ ] Edit `components/sql/Login.jsx`: After login success, setAuthUser and router.push('/(student)/dashboard').
5. [ ] Edit `components/sql/Register.jsx`: After register, optionally auto-login or redirect to login.
6. [ ] Edit `app/index.tsx`: Show login CTA if not auth'd.
7. [ ] Install AsyncStorage if needed and test full flow.

Progress will be updated as completed.
