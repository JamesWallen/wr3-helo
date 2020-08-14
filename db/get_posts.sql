select distinct u.user_id, u.username, u.profile_pic, p.post_id, p.title, p.image, p.content  
from post p
join users u on p.user_id = u.user_id;