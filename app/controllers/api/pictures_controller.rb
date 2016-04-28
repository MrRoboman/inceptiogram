class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.includes(:owner, comments: [:author]).all
  end
end
