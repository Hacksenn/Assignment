# Assignment
항해99 주특기 언어 개인 과제입니다.

1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (`param`, `query`, `body`)

=>  수정,삭제 API에서 URI를 통해 주소에 포함된 변수(req.params) 즉, post_id값을 가져오고 client가 요청한 Json 데이터(req.body)에선 password 값을 가져와서 사용했다.  

2. HTTP Method의 대표적인 4가지는 `GET`, `POST`, `PUT`, `DELETE` 가있는데 각각 어떤 상황에서 사용하셨나요?

=>  'GET' 메소드는 게시글이나 상세게시글 및 코멘트 조회할 때 사용하였다. 
    'POST'메소드는 게시글 작성 및 코멘트 작성에 사용하였다. 
    'PUT'메소드를 쓰지 않고 일부만 수정하는 'PATCH'메소드를 사용하여 게시글 수정 및 코멘트 수정할 때 사용하였다.
    'DELETE'메소드는 게시글 삭제 및 코멘트 삭제하는 API에 사용하였다.
    
3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?

=>  RESTful한 API를 설계한 부분은 URI를 명사로 사용했으나 commentId와 같이 대문자를 포함한 부분은 RESTful한 API가 아니라고 할 수 있을 것 같다.

4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?

=>  역할별로 분리할 경우 프로젝트 구조는 코드의 중복을 피해주고 안정성을 높여주며, 서비스를 확장하는데 도움이 될 것 같다.
