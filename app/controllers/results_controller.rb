class ResultsController < ApplicationController

  def show
    @results = Result.all
    render json: @results
  end

  def update
  end

end
