class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events.order(id: :desc)
    end

    def show
        @event = Event.find(params[:id])
        render json: @event
    end

    def create
        last_event_for_name = Event.where({ name: params[:name] }).last
        if last_event_for_name
            if params[:status] == last_event_for_name.read_attribute_before_type_cast(:status)
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
        params.require(:event).permit(:name, :status)
    end
end
