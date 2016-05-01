class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.all_with_deets
  end

  def create
    @success = true
    params[:picture].each do |param|
      pic = Picture.new(user_id: current_user.id, url: param[1])
      if !pic.save
        @success = false
      end
    end
    render json: {success: @success}
  end
end
