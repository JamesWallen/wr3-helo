select u.username, u.profile_pic, p.post_id, p.user_id, p.title, p.image, p.content
from post p 
join users u on u.user_id = p.user_id
where p.post_id = $1;