from fastapi import applications
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html


def swagger_monkey_patch(*args, **kwargs):
    return get_swagger_ui_html(
        *args, **kwargs,
        swagger_js_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.20.2/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.20.2/swagger-ui.css")


def redoc_monkey_patch(*args, **kwargs):
    return get_redoc_html(*args, **kwargs,
                             redoc_js_url='https://unpkg.com/redoc@2.5.0/bundles/redoc.standalone.js')


def monkey_patch():
    applications.get_swagger_ui_html = swagger_monkey_patch
    applications.get_redoc_html = redoc_monkey_patch
