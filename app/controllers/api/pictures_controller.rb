class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.all_with_deets
  end
end
