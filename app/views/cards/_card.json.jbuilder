json.extract! card, :id, :name, :message, :music_recommendation, :created_at, :updated_at
if card.image.attached?
  json.image_url rails_blob_url(card.image)
else
  json.image_url nil
end