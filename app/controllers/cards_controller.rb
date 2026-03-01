class CardsController < ApplicationController
  before_action :set_card, only: %i[ show update destroy ]

  # GET /cards
  def index
    @cards = Card.all
    
        render json: @cards.map { |card|
      {
        id: card.id,
        name: card.name,
        message: card.message,
        music_recommendation: card.music_recommendation,
        created_at: card.created_at,
        updated_at: card.updated_at,
        image_url: begin
                    if card.image.attached?
                      begin
                        # prefer direct service URL (Cloudinary)
                        card.image.url
                      rescue ArgumentError
                        # fallback for Disk blobs (older uploads)
                        url_for(card.image)
                      end
                    else
                      nil
                    end
                  end
      }
  }
  end

  # GET /cards/1
  def show
    render json: @card
  end

  # POST /cards
  def create
     @card = Card.new(card_params)
    if @card.save
      render json: @card, status: :created
    else
      render json: { errors: @card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_content
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def card_params
      params.expect(card: [ :name, :message, :music_recommendation, :image ])
    end
end
