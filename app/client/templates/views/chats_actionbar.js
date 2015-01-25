/**
Template Controllers

@module Templates
*/

/**
The chats action bar template

@class [template] views_chats_actionbar
@constructor
*/


Template['views_chats_actionbar'].helpers({
});


Template['views_chats_actionbar'].events({
    /**
    Show a modal and leave the chat

    @event click button.leave-chat
    */
    'click button.leave-chat': function(e, template){

        // render the question modal
        Router.current().render('elements_modal', {
            to: 'modal',
            data: {
                closePath: Router.routes.chat.path({sessionKey: template.data._id})
            }
        });
        Router.current().render('elements_modal_question', {
            to: 'modalContent',
            data: {
                text: TAPi18n.__('whisper.chat.texts.leaveChat'),
                // DELETE the chat on OK
                ok: function(){
                    // delete all entries
                    _.each(Entries.find({_id: {$in: template.data.entries}}).fetch(), function(item){
                        Entries.remove(item._id);
                    });


                    Router.go('/chat/public');
                    
                    // delete the chat itself, after redirect
                    // (so the chat route, doesn't try to re-create the chat)
                    Tracker.afterFlush(function(){
                        Chats.remove(template.data._id);
                    });
                }
            }
        })
    }
});