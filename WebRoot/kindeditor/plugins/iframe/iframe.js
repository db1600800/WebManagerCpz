/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('iframe', function(K) {
	var self = this, name = 'iframe', lang = self.lang('media.');
	self.plugin.iframe = {
		edit : function() {
			var html = [
				'<div style="padding:20px;">',
				//url
				'<div class="ke-dialog-row">',
				'<label for="keUrl">视频通用代码</label>',
				'<textarea class="ke-input-text" id="keUrl" name="html" style="width: 100%;height: 50px;" ></textarea>',
				'</div>',
				//width
				'<div class="ke-dialog-row">',
				'<label for="keWidth">' + lang.width + '</label>',
				'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" />',
				'<label for="keHeight" style="margin-left:30px;">' + lang.height + '</label>',
				'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" />',
				'<br/><font color="gray">不填宽高则不限制宽高</font></div>',
				'</div>'
			].join('');
			var dialog = self.createDialog({
				name : name,
				width : 450,
				height : 230,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var html = K.trim(urlBox.val()),
							width = widthBox.val(),
							height = heightBox.val();
						if (html == '' || !html.match(/<iframe[^>]*>(?:<\/iframe>)?/ig)) {
							alert('通用视频代码不正确，请确认复制内容！');
							urlBox[0].focus();
							return;
						}
						
						var attrs = K.getAttrList(html), style;
						style = [
							'style="',
							width ? 'width:' + K.removeUnit(width) + 'px;' : 'width:100%;',
							height ? 'height:' + K.removeUnit(height) + 'px;' : 'height:auto;',
						    '" '].join('');
						html = "<iframe ";
						K.each(attrs, function(i, item){
							if(i != 'style')
								html += i + '="' + item + '" ';
						});
						html += style + "></iframe>";
						var imgHtml = '<img class="ke-iframe ke-media" src="' + self.themesPath + 'common/blank.gif" '
								+ style +  'data-ke-tag="' + escape(html) + '" alt=""/>';
						self.insertHtml(imgHtml).hideDialog().focus();
					}
				}
			}),
			div = dialog.div,
			urlBox = K('[name="html"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div);

			var img = self.plugin.getSelectedIframe();
			if (img) {
				urlBox.val(unescape(img.attr('data-ke-tag')));
				if(/\d+px/i.test(img.css('width')))
					widthBox.val(K.removeUnit(img.css('width')));
				if(/\d+px/i.test(img.css('height')))
					heightBox.val(K.removeUnit(img.css('height')));
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedMedia().remove();
			// [IE] 删除图片后立即点击图片按钮出错
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.iframe.edit);
});
