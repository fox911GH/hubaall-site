import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import './Activity.css';

function timeAgo(ts) {
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return new Date(ts).toLocaleDateString('en-AU', {day:'numeric',month:'short',year:'numeric'});
}

/* ── POST CARD ── */
function PostCard({ post, onLike }) {
  const [comments, setComments]   = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commenter, setCommenter]  = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    supabase.from('comments').select('id', {count:'exact',head:true}).eq('post_id', post.id)
      .then(({count}) => setCommentCount(count || 0));
  }, [post.id]);

  const loadComments = async () => {
    if (showComments) { setShowComments(false); return; }
    setLoadingComments(true);
    const { data } = await supabase.from('comments').select('*').eq('post_id', post.id).order('created_at', {ascending:true});
    setComments(data || []);
    setCommentCount((data||[]).length);
    setLoadingComments(false);
    setShowComments(true);
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    const author = commenter.trim() || 'Community Member';
    const { data } = await supabase.from('comments').insert({ post_id: post.id, author, content: newComment.trim() }).select().single();
    if (data) {
      setComments(prev => [...prev, data]);
      setCommentCount(prev => prev + 1);
      setNewComment('');
      setCommenter('');
    }
    setSubmitting(false);
  };

  return (
    <div className="post-card fade-up">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar">{post.author?.[0]?.toUpperCase() || 'H'}</div>
        <div>
          <div className="post-author">{post.author || 'Hubaall Admin'}</div>
          <div className="post-time">{timeAgo(post.created_at)}</div>
        </div>
        <span className="post-badge">Official Post</span>
      </div>

      {/* Content */}
      {post.content && <p className="post-content">{post.content}</p>}

      {/* Media */}
      {post.media_url && post.media_type === 'image' && (
        <div className="post-media">
          <img src={post.media_url} alt="Post" loading="lazy" />
        </div>
      )}
      {post.media_url && post.media_type === 'video' && (
        <div className="post-media post-video">
          <video controls preload="metadata">
            <source src={post.media_url} />
            Your browser does not support video.
          </video>
        </div>
      )}

      {/* Actions */}
      <div className="post-actions">
        <button className="post-action-btn" onClick={() => onLike(post.id)}>
          ❤️ <span>{post.likes || 0}</span>
        </button>
        <button className="post-action-btn" onClick={loadComments}>
          💬 <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
        </button>
      </div>

      {/* Comments */}
      {(showComments || loadingComments) && (
        <div className="comments-section">
          {loadingComments && <div className="comments-loading">Loading comments…</div>}

          {!loadingComments && comments.length === 0 && (
            <div className="no-comments">No comments yet. Be the first!</div>
          )}

          {comments.map(c => (
            <div key={c.id} className="comment">
              <div className="comment-avatar">{c.author?.[0]?.toUpperCase() || '?'}</div>
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-author">{c.author}</span>
                  <span className="comment-time">{timeAgo(c.created_at)}</span>
                </div>
                <p className="comment-text">{c.content}</p>
              </div>
            </div>
          ))}

          {/* Comment input */}
          <div className="comment-form">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={commenter}
              onChange={e => setCommenter(e.target.value)}
              className="comment-name-input"
            />
            <div className="comment-input-row">
              <textarea
                placeholder="Write a comment…"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                rows={2}
                onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) submitComment(); }}
              />
              <button className="btn btn-primary comment-submit" onClick={submitComment} disabled={submitting || !newComment.trim()}>
                {submitting ? '…' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MAIN ACTIVITY PAGE ── */
export default function Activity() {
  const [posts, setPosts]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [posting, setPosting]     = useState(false);
  const [content, setContent]     = useState('');
  const [author, setAuthor]       = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState('none');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError]         = useState('');
  const fileRef = useRef();

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', {ascending:false});
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) { setError('Please select an image or video file.'); return; }
    if (isVideo && file.size > 50 * 1024 * 1024) { setError('Video must be under 50MB.'); return; }
    if (isImage && file.size > 10 * 1024 * 1024) { setError('Image must be under 10MB.'); return; }
    setMediaFile(file);
    setMediaType(isVideo ? 'video' : 'image');
    setMediaPreview(URL.createObjectURL(file));
    setError('');
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType('none');
    if (fileRef.current) fileRef.current.value = '';
  };

  const submitPost = async () => {
    if (!content.trim() && !mediaFile) { setError('Please add some text or a photo/video.'); return; }
    setPosting(true);
    setError('');
    setUploadProgress(0);

    let media_url = null;

    if (mediaFile) {
      const ext  = mediaFile.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('activity-media')
        .upload(path, mediaFile, { onUploadProgress: p => setUploadProgress(Math.round(p.loaded/p.total*100)) });

      if (uploadError) { setError('Upload failed: ' + uploadError.message); setPosting(false); return; }

      const { data: urlData } = supabase.storage.from('activity-media').getPublicUrl(path);
      media_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('posts').insert({
      author: author.trim() || 'Hubaall Admin',
      content: content.trim(),
      media_url,
      media_type: mediaType,
    });

    if (insertError) { setError('Failed to post: ' + insertError.message); }
    else {
      setContent('');
      setAuthor('');
      clearMedia();
      fetchPosts();
    }
    setPosting(false);
    setUploadProgress(0);
  };

  const handleLike = async (id) => {
    await supabase.from('posts').update({ likes: (posts.find(p => p.id === id)?.likes || 0) + 1 }).eq('id', id);
    setPosts(prev => prev.map(p => p.id === id ? {...p, likes: (p.likes||0)+1} : p));
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-label">Community Hub</div>
          <h1>Activity Feed</h1>
          <p>Share updates, photos, videos and connect with the Hubaall community.</p>
        </div>
      </section>

      <div className="activity-layout container">

        {/* ── POST COMPOSER ── */}
        <div className="composer card">
          <div className="composer-header">
            <div className="composer-avatar">H</div>
            <div>
              <div className="composer-title">Create a Post</div>
              <div className="composer-sub">Share text, photos or videos</div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Your name (leave blank for Admin)"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="composer-name"
          />

          <textarea
            placeholder="What's happening in the community? Share news, updates, or announcements…"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            className="composer-textarea"
          />

          {/* Media preview */}
          {mediaPreview && (
            <div className="media-preview">
              {mediaType === 'image'
                ? <img src={mediaPreview} alt="Preview" />
                : <video src={mediaPreview} controls />
              }
              <button className="media-remove" onClick={clearMedia}>✕ Remove</button>
            </div>
          )}

          {/* Upload progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="upload-progress">
              <div className="progress-bar" style={{width: uploadProgress+'%'}} />
              <span>{uploadProgress}%</span>
            </div>
          )}

          {error && <div className="post-error">⚠️ {error}</div>}

          <div className="composer-actions">
            <div className="composer-media-btns">
              <button className="media-btn" onClick={() => { fileRef.current.accept='image/*'; fileRef.current.click(); }}>
                🖼️ Photo
              </button>
              <button className="media-btn" onClick={() => { fileRef.current.accept='video/*'; fileRef.current.click(); }}>
                🎥 Video
              </button>
              <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleFile} style={{display:'none'}} />
            </div>
            <button className="btn btn-primary" onClick={submitPost} disabled={posting || (!content.trim() && !mediaFile)}>
              {posting ? 'Posting…' : 'Post →'}
            </button>
          </div>
        </div>

        {/* ── FEED ── */}
        <div className="feed">
          {loading && (
            <div className="feed-loading">
              {[1,2,3].map(i => <div key={i} className="skeleton-card"><div className="sk-line sk-w70"/><div className="sk-line sk-w100"/><div className="sk-line sk-w50"/></div>)}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="empty-feed card">
              <div className="empty-icon">📢</div>
              <h3>No posts yet</h3>
              <p>Be the first to share something with the community!</p>
            </div>
          )}

          {!loading && posts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>

      </div>
    </div>
  );
}
