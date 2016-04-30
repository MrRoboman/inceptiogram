class Api::FollowsController < ApplicationController
  def create
    args = { follower_id: current_user.id, leader_id: params[:follow][:user_id] }
    follow = Follow.find_by(args)

    # destroy the follow if it exists
    if follow
      follow.destroy
      @picture = Picture.find_with_deets(follow.picture_id)
      return
    end

    # save it if it does not exists
    follow = Follow.new(args)
    if follow.save
      @picture = Picture.find_with_deets(follow.picture_id)
    else
      debugger
    end
  end
end
