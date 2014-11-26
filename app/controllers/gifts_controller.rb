class GiftsController < ApplicationController

  def new

  end

  def show

  end
  def getjson
    render json: Gift.find(params[:id]).gift
  end

  def create
    @new_gift = Gift.create(
      gift: params[:nose]
      )

    if  @new_gift.save
      render json: {url: "/gift/"+@new_gift.id.to_s}

    else
      render  'new'
    end
  end
end
