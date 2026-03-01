# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://blueyprod.vercel.app'   # <-- your frontend origin

    resource '/cards',
      headers: :any,
      methods: [:get, :post, :options],
      expose: [],
      max_age: 600,
      credentials: false
  end
end