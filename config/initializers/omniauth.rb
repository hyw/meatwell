Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '1062905159340-q5ddkggjduvvs38l0ctkhm3uvkp30t6f.apps.googleusercontent.com', 'cUP1qjXMmEiOS8kHefxjICRl', {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
    redirect_uri:'http://localhost:3000/auth/google_oauth2/callback'
  }
end

