App.table = App.cable.subscriptions.create { channel: "TableChannel", table_id: window.location.pathname.slice(1) },
  connected: ->
    @install()
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    estimates_html = $('dl#estimates')
    estimates_html.empty()
    for player, estimation of data['player_estimates']
      estimates_html.append(@render_estimation(player, estimation))
    $('#average').html(data['average'])

  estimate: (player, estimation) ->
    @perform('estimate', player: player, estimation: estimation)

  reset: ->
    @perform('reset')

  install: ->
    $('form#estimates').submit =>
      player = $('input[name="player"]').val()
      estimation = $('input[name="estimate"]').val()
      @estimate(player, estimation)
      return false
    $('form#estimates button[type="reset"]').click =>
      @reset()
      false

  render_estimation: (player, estimation) ->
    """
    <dt>#{player}</dt>
    <dd>#{estimation}</dd>
    """

  currentTable: ->
    window.location.pathname.slice(1)

