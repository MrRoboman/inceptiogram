class Api::LikesController < ApplicationController

  # actually toggles likes
  def create
    args = { user_id: current_user.id, picture_id: params[:like][:picture_id] }
    like = Like.find_by(args)

    # destroy the like if it exists
    if like
      like.destroy
      @picture = Picture.find_with_deets(like.picture_id)
      return
    end

    # save it if it does not exists
    like = Like.new(args)
    if like.save
      @picture = Picture.find_with_deets(like.picture_id)
      render :create
    else

      
    end
  end

  private
  def like_params
    params.require(:like).permit(:picture_id)
  end
end
