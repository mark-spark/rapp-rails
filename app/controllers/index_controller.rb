class IndexController < ApplicationController
  protect_from_forgery :except => :pusher_auth

  def index
  end


  def pusher_auth
    response = Pusher[params[:channel_name]].authenticate(params[:socket_id])
    render :json => response
  end
end

