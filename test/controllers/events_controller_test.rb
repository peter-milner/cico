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
    assert response.body == Event.all.order(created_at: :desc).to_json
  end

  test 'should show event' do
    get event_url(id: @event.id)
    assert_response :success
    assert response.body == @event.to_json
  end

  # test 'should create event' do
  #   assert_difference('Event.count', 1) do
  #     post events_url, params: { event: { name: 'test', status: :clocked_in} }
  #   end
  #   assert_response :success
  # end

  # test 'it should not create event for the same user with the same status' do
  #   assert_difference('Event.count', 0) do
  #     post events_url, params: { event: { name: @event.name, status: @event.status} }
  #   end
  #   assert response.body == {sameState: true}.to_json
  #   assert_response :success
  # end

  test 'it should not create event for clocking out without clocking in firsts' do
    assert_difference('Event.count', 0) do
      post events_url, params: { event: { name: 'test123', status: :clocked_out} }
    end
    assert response.body == {clockInFirst: true}.to_json
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
