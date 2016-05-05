class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment.user_id = current_user.id
    if comment.save
      @picture = Picture.find_with_deets(comment.picture_id)
      render :create
    else

      
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:picture_id, :body)
  end
end
