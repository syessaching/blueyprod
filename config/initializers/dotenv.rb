# load .env in development so ENV vars like CLOUDINARY_URL are available
if Rails.env.development? || Rails.env.test?
  begin
    require "dotenv/load"
  rescue LoadError
    Rails.logger.warn "dotenv not available — skipping dotenv/load"
  end
end
