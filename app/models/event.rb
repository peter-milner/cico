class Event < ApplicationRecord
    enum status: { clocked_out: 0, clocked_in: 1 }
end
