angular.module('smartMeeting')
.factory('projects', [
    '$http',
    function($http){
        var o = {
            projects: [],
            memberprojects: [],
        };
        o.setCurrentUser = function(current_user){
            o.current_user = current_user;
        };
        o.getAll = function(){
            return $http.get('/projects.json').success(function(data){
                var projects = [];
                _.each(data, function(project){
                    project = o.addIsMemberToProjectHash(project);
                    projects.push(project);
                });
                angular.copy(projects, o.projects);
            });
        };
        o.create = function(project){
            return $http.post('/projects.json', project).success(function(data){
                data.isMember = true;
                o.projects.push(data);
            });
        };
        o.get = function(id){
            return $http.get('/projects/' + id + '.json').then(function(res){
                project = o.addIsMemberToProjectHash(res.data);
                return project;
            });
        };

        o.addIsMemberToProjectHash = function(project){
            var project_user_ids = _.pluck(project.users, 'id');
            project.isMember = _.contains(project_user_ids, o.current_user.id) ? true : false;
            return project;
        };

        o.join = function(project){
            return $http.put('/projects/' + project.id + '/join.json').success(function(data){
                project.users.push(o.current_user);
                project.isMember = true;
            });
        };

        o.leave = function(project){
            return $http.put('/projects/' + project.id + '/leave.json').success(function(res){
                project.isMember = false;
                project.users = _.reject(project.users, function(user){ return user.id == o.current_user.id; });
            });
        };

        o.delete = function(id){
            return $http.delete('/projects/' + id + '.json');
        };

        return o;
    }
]);