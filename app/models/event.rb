class Event < ApplicationRecord
    enum status: { checked_out: 0, checked_in: 1 }
end
