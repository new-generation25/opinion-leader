'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    try {
      await signIn(providerId, { 
        callbackUrl: '/' 
      });
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <h2>Opinion Leader에 로그인</h2>
        <p>의견을 제출하고 참여하려면 로그인해주세요.</p>
        
        <div className="auth-providers">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button
                key={provider.name}
                onClick={() => handleSignIn(provider.id)}
                className={`auth-btn ${provider.id === 'google' ? 'google-btn' : 'naver-btn'}`}
              >
                <div className="auth-btn-content">
                  {provider.id === 'google' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  ) : (
                    <div className="naver-icon">N</div>
                  )}
                  <span>{provider.name}로 로그인</span>
                </div>
              </button>
            ))}
        </div>
        
        <button 
          onClick={() => router.push('/')}
          className="back-btn"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
} 