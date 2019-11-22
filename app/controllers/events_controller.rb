class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events.order(created_at: :desc)
    end

    def show
        @event = Event.find(params[:id])
        render json: @event
    end

    def create
        last_event_for_name = Event.where({ name: params[:event][:name] }).order(created_at: :asc).last
        if last_event_for_name.present?
            if params[:event][:status].is_a? Integer
                params[:event][:status] = Event.statuses.key(params[:event][:status])
            end
            if params[:event][:status] == last_event_for_name.status
                return render json: {
                    sameState: true,
                }
            end
        end

        @event = Event.new(event_params)
        @event.save
        render json: @event
    end

    def update
        @event = Event.find(params[:id])
        @event.update(event_params)
        render json: @event
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy
        render json: @event
    end

    private
    def event_params
        params.require(:event).permit(:name, :status, :created_at)
    end
end
