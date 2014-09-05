YUI().use(
	'aui-base',
	'aui-popover',
	'event-outside',
	'event-tap',
	function (A) {
		var Lang = A.Lang,

			CONVERT_TAGS = ['SPAN'],

			KEY_CODES = [13, 32, 37, 38, 39, 40],

			MOBILE = A.UA.mobile,

			SVG_EMAIL_ICON = '<svg xmlns="http://www.w3.org/2000/svg" height="20" style="display: none;" version="1.1" width="20"><path d="M0.5 4 L10 11.3 L19.5 4 L0.5 4 zM0 5.5 L0 15.2 L6.4 10.4 L0 5.5 zM20 5.5 L13.6 10.4 L20 15.3 L20 5.5 zM7.6 11.3 L1.5 16 L18.5 16 L12.4 11.3 L10.2 13 L10 13.2 L9.8 13 L7.6 11.3 z" id="emailIconTemplate"/></svg>',

			SVG_SMS_ICON = '<svg xmlns="http://www.w3.org/2000/svg" height="20" style="display: none;" version="1.1" width="20"><path d="M5.5 -0 C4.7 -0 4 0.7 4 1.5 l0 17C4 19.3 4.7 20 5.5 20 l9 0c0.8 0 1.5 -0.7 1.5 -1.5l0 -17C16 0.7 15.3 -0 14.5 -0 l-9 0zm2.8 0.7 3.5 0c0.2 0 0.3 0.1 0.3 0.3l0 0c0 0.2 -0.1 0.3 -0.3 0.3l-3.5 0C8.1 1.3 7.9 1.2 7.9 1 l0 -0C7.9 0.8 8.1 0.7 8.2 0.7 zM5 2.1 l10 0 0 15.3 -10 0L5 2.1 zM6.4 5.5 C6.1 5.5 5.8 5.8 5.8 6.1 l0 5.6c0 0.1 0 0.3 0 0.4 -0.1 0.8 -0.6 1.2 -0.6 1.2 0 0 0.3 -0.1 0.7 -0.2 0.1 0.2 0.3 0.3 0.5 0.3l5.6 0c0.3 0 0.6 -0.3 0.6 -0.6l0 -6.7C12.7 5.8 12.4 5.5 12.1 5.5 l-5.6 0zm1.5 8.5c-0.3 0 -0.6 0.3 -0.6 0.6l0 1.5c0 0.3 0.3 0.6 0.6 0.6l5.6 0c0.2 0 0.4 -0.1 0.5 -0.3 0.4 0.2 0.8 0.3 0.8 0.3 0 0 -0.5 -0.4 -0.6 -1.2l0 -0.8C14.2 14.3 13.9 14 13.5 14 L7.9 14 zM10 17.9 c0.4 0 0.8 0.3 0.8 0.8 0 0.4 -0.3 0.8 -0.8 0.8 -0.4 0 -0.8 -0.3 -0.8 -0.8 0 -0.4 0.3 -0.8 0.8 -0.8z" id="mobileIconTemplate" /></svg>',

			SVG_SKYPE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" height="20" style="display: none;" version="1.1" viewBox="0 0 216 146" width="20" xml:space="preserve"><path d="m 204.2 94 c 1.5 -7.2 2.2 -14.2 2.2 -21 0 -13.3 -2.6 -26.1 -7.8 -38.3 C 193.5 22.6 186.5 12.1 177.7 3.3 168.9 -5.5 158.4 -12.5 146.2 -17.7 c -12.2 -5.2 -24.9 -7.8 -38.3 -7.8 -6.8 0 -13.8 0.7 -21 2.2 -9.7 -7.5 -20.6 -11.2 -32.7 -11.2 -14.8 0 -27.5 5.2 -38 15.7 C 5.8 -8.2 0.5 4.5 0.5 19.3 c 0 12.1 3.7 23 11.2 32.7 -1.5 7.2 -2.2 14.2 -2.2 21 0 13.3 2.6 26.1 7.8 38.3 5.2 12.2 12.2 22.7 21 31.5 8.8 8.8 19.3 15.8 31.5 21 12.2 5.2 24.9 7.8 38.3 7.8 6.8 0 13.8 -0.7 21 -2.2 9.7 7.5 20.6 11.2 32.7 11.2 14.8 0 27.5 -5.2 38 -15.7 10.5 -10.5 15.7 -23.1 15.7 -38 -0 -12.1 -3.7 -23 -11.2 -32.7 z m -44.2 20.8 c -3.1 5.5 -7.2 9.8 -12.4 13.1 -5.2 3.3 -10.9 5.8 -17.1 7.5 -6.2 1.7 -12.8 2.6 -19.6 2.6 -15.8 0 -29.3 -3.1 -40.7 -9.2 -11.4 -6.1 -17.1 -13.4 -17.1 -22 0 -4.2 1.2 -7.7 3.6 -10.5 2.4 -2.8 5.9 -4.2 10.6 -4.2 2.7 0 5.2 0.7 7.6 2.2 2.3 1.5 4.5 3.3 6.4 5.4 2 2.1 4.1 4.2 6.4 6.3 2.3 2.1 5.3 3.9 9.1 5.4 3.8 1.5 8 2.2 12.8 2.2 6.1 0 11 -1.2 14.7 -3.6 3.7 -2.4 5.6 -5.4 5.6 -9 0 -3.7 -1.5 -6.5 -4.5 -8.4 -2 -1.3 -7.3 -3 -15.7 -5 L 89.2 82.6 C 83.6 81.2 78.8 79.7 74.8 78 70.8 76.3 67.1 74 63.6 71.2 c -3.4 -2.8 -6.1 -6.3 -7.8 -10.6 -1.8 -4.2 -2.7 -9.2 -2.7 -14.9 0 -6.8 1.6 -12.8 4.7 -18 3.1 -5.2 7.3 -9.2 12.4 -12.2 5.2 -2.9 10.7 -5.1 16.7 -6.6 6 -1.4 12.1 -2.2 18.5 -2.2 9 0 17.4 1.1 25.5 3.2 8 2.1 14.6 5.3 19.9 9.4 5.2 4.2 7.8 8.8 7.8 13.9 0 4.2 -1.3 7.8 -4 10.8 -2.7 3 -6.2 4.5 -10.6 4.5 -2.4 0 -4.7 -0.6 -6.7 -1.7 -2.1 -1.1 -3.9 -2.5 -5.6 -4.1 -1.7 -1.6 -3.5 -3.1 -5.3 -4.7 -1.9 -1.5 -4.4 -2.9 -7.5 -4 -3.2 -1.1 -6.8 -1.7 -10.8 -1.7 -13.4 0 -20.1 3.6 -20.1 10.8 0 1.6 0.4 3 1 4.2 0.7 1.2 1.5 2.2 2.3 2.9 0.8 0.7 2.2 1.5 4.2 2.2 2 0.7 3.6 1.3 4.9 1.6 1.3 0.3 3.4 0.8 6.2 1.5 l 14.5 3.4 c 4.6 1 8.6 2.1 12.2 3.2 3.6 1.1 7.4 2.7 11.5 4.8 4.1 2.1 7.5 4.3 10.2 6.9 2.7 2.5 5 5.7 6.8 9.6 1.8 3.9 2.7 8.1 2.7 12.8 -0 6.8 -1.5 12.9 -4.6 18.4 z" id="skypeIconTemplate" /></svg>',

			TPL_EMAIL_ICON = '<svg height="20" style="fill:#AAA; vertical-align: bottom;" width="20">' +
				'<use xlink:href="#emailIconTemplate">' +
			'</svg>',

			TPL_SKYPE_ICON = '<svg height="20" style="fill:#00AFFF; vertical-align: bottom;" viewBox="0 0 216 146" width="20">' +
				'<use xlink:href="#skypeIconTemplate">' +
			'</svg>',

			TPL_SMS_ICON = '<svg height="20" style="fill:#AAA; vertical-align: bottom;" width="20">' +
				'<use xlink:href="#mobileIconTemplate">' +
			'</svg>',

			TPL_CHAT_LINK = '<a href="{href}" style="display: block; padding: 5px;">{type}</a>',

			TPL_CHAT_LINK_GROUP = '<div>' +
				'<div style="border-bottom: 1px solid #DDD; color: #AAA; min-width: 100px; padding-bottom: 3px;">{label}:</div>' +
				'{chatLinks}' +
			'</div>',

			TPL_TRIGGER = '<a class="{cssClass}" href="javascript:;" id="{id}" data-displayname="{displayName}" data-chatemail="{email}" data-chatlauncher="{users}" data-chatnumber="{number}" data-chattopic="{topic}">{html}</a>';

		var ChatLauncher = A.Component.create(
			{
				NAME: 'chatlauncher',

				EXTENDS: A.Base,

				prototype: {
					EMAIL_SCHEMA: {
						groupIconTemplate: SVG_EMAIL_ICON,
						groupLabelFn: '_emailGroupLabelFn',
						types: ['email'],
						URIFn: '_emailURIFn'
					},

					SKYPE_NUMBER_SCHEMA: {
						groupIconTemplate: SVG_SKYPE_ICON,
						groupLabelFn: '_skypeGroupLabelFn',
						types: ['sms', 'call'],
						URIFn: '_skypeURIFn'
					},

					SKYPE_SCHEMA: {
						groupIconTemplate: SVG_SKYPE_ICON,
						groupLabelFn: '_skypeGroupLabelFn',
						types: ['chat', 'call'],
						URIFn: '_skypeURIFn'
					},

					SMS_SCHEMA: {
						groupIconTemplate: SVG_SMS_ICON,
						groupLabelFn: '_SMSGroupLabelFn',
						types: ['sms'],
						URIFn: '_SMSURIFn'
					},

					initializer: function(config) {
						var instance = this;

						instance._renderTriggerUI();

						instance._bindTriggerUI();
					},

					_adjustLabelCase: function(label) {
						if (label !== 'sms') {
							label = label.charAt(0).toUpperCase() + label.slice(1);
						}
						else {
							label = label.toUpperCase();
						}

						return label;
					},

					_bindPopoverUI: function(popover) {
						var instance = this;

						popover.get('boundingBox').on('mouseleave', instance._hidePopoverTask, instance);
					},

					_bindTriggerUI: function() {
						var instance = this,
							triggers = instance._triggers;

						var syncPopeverEvent = MOBILE ? 'tap' : 'mouseenter';

						if (triggers) {
							triggers.on(['keyup', syncPopeverEvent], A.bind(instance._syncPopoverHandler, instance));

							if (!MOBILE) {
								triggers.on('mouseleave', A.bind(instance._onLinkMouseLeave, instance));
							}
						}
					},

					_clearHideTimeout: function() {
						var instance = this;

						var timeout = instance._hidePopoverTimeout;

						if (timeout) {
							timeout.cancel();

							instance._hidePopoverTimeout = null;
						}
					},

					_emailGroupLabelFn: function() {
						var instance = this,
							email = instance._chatLinkData.email,
							label = TPL_EMAIL_ICON + ' ';

						if (instance._hasMultipleParticipants(email)) {
							label+= 'Email';
						}
						else {
							label+= email;
						}

						return label;
					},

					_emailURIFn: function(type) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							uri = ['mailto:'];

						uri.push(chatLinkData.email);

						return uri.join('');
					},

					_getBodyNode: function() {
						var instance = this,
							bodyNode = instance._bodyNode;

						if (!bodyNode) {
							bodyNode = A.one('body');

							instance._bodyNode = bodyNode;
						}

						return bodyNode;
					},

					_getChatLink: function(type) {
						var instance = this,
							schema = instance._currentSchema;

						var href = instance[schema.URIFn](type);

						return Lang.sub(
							TPL_CHAT_LINK,
							{
								href: href,
								type: instance._adjustLabelCase(type)
							}
						);
					},

					_getChatLinkData: function(node) {
						var instance = this;

						var chatLinkData = {
							displayName: node.attr('data-displayname'),
							email: node.attr('data-chatemail'),
							html: node.html(),
							number: node.attr('data-chatnumber'),
							topic: node.attr('data-chattopic'),
							users: node.attr('data-chatlauncher')
						};

						instance._chatLinkData = chatLinkData;

						return chatLinkData;
					},

					_getChatLinkGroup: function(client) {
						var instance = this,
							content = [],
							schema = instance._setCurrentSchema(client),
							types = schema.types;

						instance._renderIconTemplate();

						var label = instance[schema.groupLabelFn]();

						for (var i = 0; i < types.length; i++) {
							content.push(instance._getChatLink(types[i]));
						}

						return Lang.sub(
							TPL_CHAT_LINK_GROUP,
							{
								label: label,
								chatLinks: content.join('')
							}
						);
					},

					_getPopover: function(node) {
						var instance = this;
							popover = instance._popover;

						if (!popover) {
							popover = new A.Popover(
								{
									align: {
										points: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC]
									},
									constrain: true,
									position: 'right',
									zIndex: 1
								}
							);

							if (!MOBILE) {
								instance._bindPopoverUI(popover);
							}
							else {
								A.Event.defineOutside('touchend');
							}

							instance._popover = popover;
						}

						return popover;
					},

					_getPopoverBodyContent: function(chatLinkData) {
						var instance = this,
							content = [];

						if (chatLinkData.users) {
							content.push(instance._getChatLinkGroup('skype'));
						}

						if (chatLinkData.number) {
							content.push(instance._getChatLinkGroup('skypeNumber'));

							if (MOBILE) {
								content.push(instance._getChatLinkGroup('sms'));
							}
						}

						if (chatLinkData.email) {
							content.push(instance._getChatLinkGroup('email'));
						}

						return content.join('');
					},

					_getPopoverHeaderContent: function(chatLinkData) {
						return chatLinkData.displayName || chatLinkData.html || null;
					},

					_getSkypeUserData: function(skypeType) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							userData;

						if (skypeType) {
							userData = chatLinkData.users;
						}
						else {
							userData = chatLinkData.number;
						}

						return userData;
					},

					_hasMultipleParticipants: function(users) {
						return users.match(',');
					},

					_hidePopover: function() {
						var instance = this;
							popover = instance._getPopover();

						instance._clearHideTimeout();

						if (!popover.get('boundingBox').test(':hover')) {
							popover.hide();
						}
					},

					_hidePopoverTask: function() {
						var instance = this;

						if (!instance._hidePopoverTimeout) {
							instance._hidePopoverTimeout = A.later(300, instance, instance._hidePopover);
						}
					},

					_isSkypeUserName: function() {
						var instance = this,
							client = instance._currentClient;

						return (client === 'skype');
					},

					_onLinkMouseLeave: function(event) {
						var instance = this;

						instance._hidePopoverTask();
					},

					_renderIconTemplate: function() {
						var instance = this,
							client = instance._currentClient,
							schema = instance._currentSchema,
							templates = instance._iconTemplates || {};

						if (client === 'skypeNumber') {
							client = 'skype';
						}

						if (!templates[client]) {
							instance._getBodyNode().append(schema.groupIconTemplate);

							templates[client] = true;

							instance._iconTemplates = templates;
						}
					},

					_renderTriggerUI: function() {
						var instance = this;

						var triggers = A.all('[data-chatemail], [data-chatlauncher], [data-chatnumber]');

						triggers.each(
							function(item, index) {
								if (instance._validateTag(item)) {
									var itemAttrs = {
										cssClass: item.attr('class'),
										id: item.attr('id')
									};

									var chatLinkData = instance._getChatLinkData(item);

									var anchor = A.Node.create(
										Lang.sub(
											TPL_TRIGGER,
											A.mix(itemAttrs, chatLinkData)
										)
									);

									item.replace(anchor);

									triggers._nodes[index] = anchor;
								}
							}
						);

						instance._triggers = triggers;
					},

					_setCurrentSchema: function(client) {
						var instance = this,
							schema;

						if (client === 'email') {
							schema = instance.EMAIL_SCHEMA;
						}
						else if (client === 'skype') {
							schema = instance.SKYPE_SCHEMA;
						}
						else if (client === 'skypeNumber') {
							schema = instance.SKYPE_NUMBER_SCHEMA;
						}
						else if (client === 'sms') {
							schema = instance.SMS_SCHEMA;
						}

						instance._currentClient = client;
						instance._currentSchema = schema;

						return schema;
					},

					_setHideHandler: function(popover) {
						var instance = this;

						if (!instance._hideHandler) {
							instance._hideHandler = popover.get('boundingBox').on(
								'touchendoutside',
								function(event) {
									var target = event.target;

									if (!target.hasAttribute('data-chatlauncher') && !target.ancestor('.popover', true, 'body')) {
										instance._hidePopover();

										instance._hideHandler.detach();
										instance._hideHandler = null;
									}
								}
							);
						}
					},

					_skypeGroupLabelFn: function() {
						var instance = this,
							label = TPL_SKYPE_ICON + ' ',
							userName = instance._isSkypeUserName(),
							userData = instance._getSkypeUserData(userName);

						if (instance._hasMultipleParticipants(userData)) {
							if (userName) {
								label+= 'Usernames';
							}
							else {
								label+= 'Phone Numbers';
							}
						}
						else {
							label+= userData;
						}

						return label;
					},

					_skypeURIFn: function(type) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							conferenceTopic,
							topic = chatLinkData.topic,
							uri = ['skype:'],
							userData = instance._getSkypeUserData(instance._isSkypeUserName());

						if (instance._hasMultipleParticipants(userData)) {
							userData = userData.replace(/,/g, ';');

							if (topic != 'false') {
								conferenceTopic = topic;
							}
						}

						uri.push(userData + '?' + type);

						if (conferenceTopic) {
							uri.push('&topic=' + encodeURI(conferenceTopic));
						}

						return uri.join('');
					},

					_SMSGroupLabelFn: function() {
						return TPL_SMS_ICON + ' SMS (Native)';
					},

					_SMSURIFn: function(type) {
						return 'sms:' + this._chatLinkData.number;
					},

					_syncPopover: function(event) {
						var instance = this,
							currentTarget = event.currentTarget,
							popover = instance._getPopover(),
							triggerId = currentTarget.guid();

						if (triggerId != instance._activeId) {
							var chatLinkData = instance._getChatLinkData(currentTarget);

							popover.setAttrs(
								{
									'align.node': currentTarget,
									bodyContent: instance._getPopoverBodyContent(chatLinkData),
									headerContent: instance._getPopoverHeaderContent(chatLinkData)
								}
							);

							instance._activeId = triggerId;

							event.halt();
						}

						if (!popover.get('rendered')) {
							popover.render();
						}
						else {
							popover.show();
						}

						popover.align();

						if (event.type === 'keyup') {
							popover.get('boundingBox').one('a').focus();
						}

						instance._setHideHandler(popover);
					},

					_syncPopoverHandler: function(event) {
						var instance = this,
							keyCode = event.keyCode;

						if (!keyCode || (KEY_CODES.indexOf(keyCode) !== -1)) {
							instance._clearHideTimeout();

							instance._syncPopover(event);
						}
					},

					_validateTag: function(node) {
						var instance = this;

						return CONVERT_TAGS.indexOf(node.get('nodeName')) !== -1;
					}
				}
			}
		);

		new ChatLauncher();
	}
);