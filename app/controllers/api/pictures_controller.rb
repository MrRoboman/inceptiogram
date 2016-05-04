class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.all_with_deets
  end

  def create
    @success = true
    params[:picture].each do |param|
      debugger
      pic = Picture.new(user_id: current_user.id, url: param[1]['url'], public_id: param[1]['public_id'])
      if !pic.save
        @success = false
      end
    end
    render json: {success: @success}
  end
end
