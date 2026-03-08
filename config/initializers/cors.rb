# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    
    
        # 'localhost:3000', 'http://localhost:3000',
        #     'localhost:3001', 'http://localhost:3001', 
        #     'https://blueyprod.vercel.app'

    resource '*',
      headers: :any,
      methods: [:get, :post, :options],
      expose: [],
      max_age: 600,
      credentials: false
  end
end