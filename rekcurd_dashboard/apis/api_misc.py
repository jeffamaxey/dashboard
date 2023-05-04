# coding: utf-8


from flask_restplus import Resource, Namespace

from . import api


misc_api_namespace = Namespace('misc', description='Misc API Endpoint.')


@misc_api_namespace.route('/settings')
class ApiSettings(Resource):
    def get(self):
        return {'auth': api.dashboard_config.IS_ACTIVATE_AUTH}
