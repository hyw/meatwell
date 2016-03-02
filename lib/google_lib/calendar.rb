module GoogleLib
  class Calendar

    attr_accessor :client, :user, :calendars, :service

    def initialize user_id
      @client = Google::APIClient.new
      @user = User.find(user_id)
      client.authorization.access_token = user.gcal_token
      @service = client.discovered_api('calendar', 'v3')
    end

    def get_all_visible_events
      events = []
      get_visible_calendars
      @calendars.each do |calendar|
        events << get_events_from_calendar(calendar["id"])
      end
      return events
    end

    def get_visible_calendars
      result = @client.execute(
      :api_method => @service.calendar_list.list,
      :parameters => {},
      :headers => {'Content-Type' => 'application/json'})

      @calendars = []
      calendars = JSON.parse(result.body)["items"]
      calendars.each do |calendar|
        if calendar["selected"]
          @calendars << calendar
        end
      end
    end

    def get_events_from_calendar calendar_id
      result = @client.execute(
        :api_method => @service.events.list,
        :parameters => {'calendarId' => calendar_id,
          "singleEvents" => true,
          "timeMin" => Time.now.to_datetime.rfc3339},
        :headers => {'Content-Type' => 'application/json'}
      )

      events_hash = JSON.parse(result.body)["items"]
      formatted_events_array = format_events events_hash
    end

    private

      def format_events events
        formatted_events_array = []
        events.each do |event|
            formatted_event = Hash.new
            formatted_event["start"] = event["start"]["dateTime"] if event["start"]
            formatted_event["title"] = event["summary"]
            formatted_events_array << formatted_event
        end
        return formatted_events_array
      end


  end
end