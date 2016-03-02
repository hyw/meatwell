FactoryGirl.define do
  factory :agenda_note do
    agendaitem nil
    body "MyText"
    order 1
    type 1
  end
end
