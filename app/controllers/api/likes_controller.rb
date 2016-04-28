class Api::LikesController < ApplicationController

  # actually toggles likes
  def create
    args = { user_id: current_user.id, picture_id: params[:like][:picture_id] }
    like = Like.find_by(args)

    # destroy the like if it exists
    if like
      like.destroy
    end

    # save it if it does not exists
    like = Like.new(args)
    if like.save
      @picture = Picture.includes(:owner, likes: [:user], comments: [:author])
                        .find_by_id(like.picture_id)
      render :create
    else
      debugger
    end
  end

  private
  def like_params
    params.require(:like).permit(:picture_id)
  end
end
