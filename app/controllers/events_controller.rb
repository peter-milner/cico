class EventsController < ApplicationController
    def create
        last_event_for_name = Event.where({ name: params[:name] }).last
        if last_event_for_name
            if params[:status] == last_event_for_name.read_attribute_before_type_cast(:status)
                return render json: {
                    code: 1000,
                    error: 'You cannot update to the same status.'
                }, status: :bad_request
            end
        end

        @event = Event.new(event_params)
        @event.save
    end

    private
    def event_params
        params.require(:event).permit(:name, :status)
    end
end
