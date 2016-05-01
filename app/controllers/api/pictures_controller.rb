class Api::PicturesController < ApplicationController
  def index
    debugger
    @pictures = Picture.all_with_deets
  end
end
