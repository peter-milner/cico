require 'test_helper'

class EventTest < ActiveSupport::TestCase
  test 'status is the correct enum' do
    event = events(:one)
    assert event.clocked_out?
    assert_not event.clocked_in?
  end
end
