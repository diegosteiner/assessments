App.table = App.cable.subscriptions.create { channel: "TableChannel", table_id: window.location.pathname.slice(1) },
  connected: ->
    @install()
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    self = @
    update_topic = (topic) ->
      topic_html = $('#topic-display')
      topic_html.html(self.render_topic(topic))

    update_estimates = (player_estimates) ->
      estimates_html = $('dl#estimates')
      estimates_html.empty()
      for player, estimation of player_estimates
        estimates_html.append(self.render_estimation(player, estimation))
      $('#average').html(data['average'])

    topic_set = !!data['topic']
    if topic_set
      update_topic(data['topic'])

    hide_topic_form = topic_set
    @update_topic_form(hide_topic_form)

    update_estimates(data['player_estimates'])

  update_topic: (topic) ->
    @perform('update_topic', topic: topic)

  estimate: (player, estimation) ->
    @perform('estimate', player: player, estimation: estimation)

  reset: ->
    @perform('reset')

  install: ->
    $('form#topic').submit =>
      topic = $('input[name="topic"]').val()
      @update_topic(topic)
      return false
    $('form#estimates').submit =>
      player = $('input[name="player"]').val()
      estimation = $('input[name="estimate"]').val()
      @estimate(player, estimation)
      return false
    $('form#estimates button[type="reset"]').click =>
      @reset()
      false

    topic_set = !!$('#topic-display').html()
    hide_topic_form = topic_set
    @update_topic_form(hide_topic_form)

  render_topic: (topic) ->
    topic

  render_estimation: (player, estimation) ->
    """
    <dt>#{player}</dt>
    <dd>#{estimation}</dd>
    """

  update_topic_form: (hidden) ->
    topic_form = $('form#topic')
    if hidden then topic_form.hide() else topic_form.show()

  currentTable: ->
    window.location.pathname.slice(1)

