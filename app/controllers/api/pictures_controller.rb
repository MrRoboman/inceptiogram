class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.all_with_deets
  end

  def create
    @success = true
    p_ids = []
    params[:picture].each do |param|
      pic = Picture.new(user_id: current_user.id, url: param[1]['url'], public_id: param[1]['public_id'])
      p_ids << [param[1]['url'], param[1]['public_id']]
      if !pic.save
        @success = false
      end
    end
    p p_ids
    render json: {success: @success}
  end
end
