class Api::PicturesController < ApplicationController
  def index
    if current_user
      @pictures = Picture.all_with_deets(current_user)
    else
      @pictures = []
    end
  end

  def allpictures
    @pictures = Picture.all
    render :index
  end

  def create
    @success = true
    p_ids = []
    params[:picture].each do |param|
      pic = Picture.new(user_id: current_user.id, url: param[1]['url'], public_id: param[1]['public_id'])
      p_ids << [param[1]['url'], param[1]['public_id']]
      if !pic.save
        @success = false # i do nothing with this.
      end
    end
    @profile = User.find_with_deets(current_user.id)
  end

  def show
    @picture = Picture.find(params[:id])
  end
end
