require 'test_helper'

class EventTest < ActiveSupport::TestCase
  test 'status is the correct enum' do
    event = events(:one)
    assert event.checked_out?
    assert_not event.checked_in?
  end
end
