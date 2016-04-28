class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.includes(:owner).all
  end
end
