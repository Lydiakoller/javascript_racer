get '/' do
  erb :index
end

post '/results' do
  puts params['player1']['name']
  player1 = Player.find_by_name(params['player1']['name']) || Player.create(:name => params['player1']['name'])
  player2 = Player.find_by_name(params['player2']['name']) || Player.create(:name => params['player2']['name'])
  if params['winner'] == 'player1'
    winner = player1.id
  elsif params['winner'] == 'player2'
    winner = player2.id
  end
  Game.create(player1: player1.id, player2: player2.id, winner: winner, time: params['winnerTime'])
  content_type :json
  params.to_json
end


# # {"validate"=>"undefined", "player1"=>{"name"=>"jss", "result"=>"winner"}, "player2"=>{"name"=>"ljk", "result"=>"loser"}, "winnerTime"=>"11228"}
# @foo = Foo.find_by_bar("baz") || Foo.create(:bar => "baz")
