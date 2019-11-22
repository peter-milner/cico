require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event = events(:one)
  end

  teardown do
    Rails.cache.clear
  end

  test 'should get events' do
    get events_url
    assert_response :success
    assert response.body == Event.all.order(id: :desc).to_json
  end

  test 'should show event' do
    get event_url(id: @event.id)
    assert_response :success
    assert response.body == @event.to_json
  end

  test 'should create event' do
    assert_difference('Event.count', 1) do
      post events_url, params: { event: { name: 'test', status: :clocked_out } } 
    end
    assert_response :success
  end

  test 'should update event' do
    edit_name = @event.name+'123'
    patch event_url(@event), params: { event: { name: edit_name } }
    assert_response :success
    assert JSON.parse(response.body)['name'] == edit_name
  end

  test 'should destroy event' do
    assert_difference('Event.count', -1) do
      delete event_url(@event)
    end
    assert_response :success
    assert response.body == @event.to_json
  end
end
